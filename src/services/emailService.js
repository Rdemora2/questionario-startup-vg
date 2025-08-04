import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_2qb6c6k";
const EMAILJS_TEMPLATE_ID = "template_bcd9y1m";
const EMAILJS_PUBLIC_KEY = "hmd0lrOzPXLwWJzUz";

if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export const sendQuestionnaireResults = async (userInfo, pdfBlob, results) => {
  // Função para calcular tamanho aproximado dos dados em KB
  const calculateDataSize = (data) => {
    return new Blob([JSON.stringify(data)]).size / 1024;
  };

  // Preparar parâmetros básicos do template (fora do try/catch para acessibilidade)
  const baseTemplateParams = {
    to_email: "contato@valiantgroup.com.br",
    from_name: "Sistema de Avaliação Valiant Group",
    subject: `Nova Avaliação de Startup: ${userInfo.ideaName} - ${userInfo.userName}`,

    idea_name: userInfo.ideaName,
    user_name: userInfo.userName,
    user_email: userInfo.email,
    user_whatsapp: userInfo.whatsapp,

    total_score: results.totalScore.toFixed(1),
    completion_date: new Date(results.completionDate).toLocaleDateString(
      "pt-BR",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ),
    answered_questions: results.answeredQuestions,
    total_questions: results.totalQuestions,

    category_scores: Object.entries(results.categoryScores)
      .map(
        ([, categoryData]) =>
          `${categoryData.title}: ${categoryData.average.toFixed(1)}/5.0`
      )
      .join("\n"),

    pdf_filename: `avaliacao-startup-${userInfo.ideaName
      .replace(/\s+/g, "-")
      .toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`,
  };

  try {
    console.log("Preparando envio de email...");

    // Se o EmailJS não estiver configurado, usar fallback
    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      console.log("EmailJS não configurado, usando fallback local...");
      return await sendEmailFallback(userInfo, results);
    }

    const arrayBuffer = await pdfBlob.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataUrl = `data:application/pdf;base64,${base64}`;

    // Função para formatar as respostas detalhadas em HTML simples e compacto
    const formatDetailedAnswers = (categoryScores) => {
      return Object.entries(categoryScores)
        .map(([, categoryData]) => {
          let categorySection = `
            <h4 style="color:#495057;border-bottom:2px solid #495057;padding-bottom:5px;margin:20px 0 10px 0;">
              📁 ${categoryData.title} - ${categoryData.average.toFixed(1)}/5.0
            </h4>
            <div style="margin-left:10px;">`;

          categoryData.questions.forEach((question, index) => {
            // Truncar pergunta se muito longa
            const shortQuestion =
              question.question.length > 60
                ? question.question.substring(0, 60) + "..."
                : question.question;

            // Formatar resposta de forma compacta
            let formattedAnswer = "";
            if (question.answer === null || question.answer === undefined) {
              formattedAnswer = "<em>Não respondida</em>";
            } else if (typeof question.answer === "object") {
              if (question.answer.answer !== undefined) {
                formattedAnswer = `<strong>${
                  question.answer.answer ? "Sim" : "Não"
                }</strong>`;
                if (
                  question.answer.details &&
                  question.answer.details.length > 0
                ) {
                  // Truncar detalhes se muito longos
                  const shortDetails =
                    question.answer.details.length > 80
                      ? question.answer.details.substring(0, 80) + "..."
                      : question.answer.details;
                  formattedAnswer += `<br><em>${shortDetails}</em>`;
                }
              } else {
                formattedAnswer = "[Objeto complexo]";
              }
            } else if (typeof question.answer === "boolean") {
              formattedAnswer = `<strong>${
                question.answer ? "Sim" : "Não"
              }</strong>`;
            } else if (
              question.answerText &&
              question.answerText !== question.answer
            ) {
              const answerStr = String(question.answerText);
              formattedAnswer =
                answerStr.length > 60
                  ? answerStr.substring(0, 60) + "..."
                  : answerStr;
            } else {
              const answerStr = String(question.answer);
              formattedAnswer =
                answerStr.length > 40
                  ? answerStr.substring(0, 40) + "..."
                  : answerStr;
            }

            categorySection += `
              <p style="margin:5px 0;font-size:13px;">
                <strong>${index + 1}.</strong> ${shortQuestion}<br>
                <span style="color:#007bff;">💬 ${formattedAnswer}</span> 
                <span style="color:#28a745;font-weight:bold;">(${
                  question.score
                }/5)</span>
              </p>`;
          });

          categorySection += `</div>`;
          return categorySection;
        })
        .join("");
    };

    // Tentar incluir respostas detalhadas
    let templateParams = {
      ...baseTemplateParams,
      detailed_responses: formatDetailedAnswers(results.categoryScores),
      pdf_attachment: dataUrl,
    };

    // Verificar se os dados não excedem o limite de 45KB (margem de segurança)
    const dataSize = calculateDataSize(templateParams);
    console.log(`Tamanho dos dados: ${dataSize.toFixed(2)}KB`);

    if (dataSize > 45) {
      console.log("Dados muito grandes, enviando versão simplificada...");
      // Enviar sem respostas detalhadas e sem PDF
      templateParams = {
        ...baseTemplateParams,
        detailed_responses:
          "<p><strong>⚠️ Respostas muito extensas para incluir no email.</strong><br>Consulte o arquivo PDF que será disponibilizado separadamente.</p>",
        pdf_attachment: null, // Remove PDF se dados muito grandes
      };
    }

    console.log("Enviando email via EmailJS...");
    console.log("Parâmetros do template:", {
      ...templateParams,
      pdf_attachment: templateParams.pdf_attachment
        ? `[PDF de ${(templateParams.pdf_attachment.length / 1024).toFixed(
            1
          )}KB]`
        : "[Sem PDF]",
    });

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log("Email enviado com sucesso via EmailJS:", response);
    return { success: true, data: response, method: "EmailJS" };
  } catch (error) {
    console.error("Erro ao enviar email via EmailJS:", error);

    // Se foi erro de tamanho, tentar novamente sem o PDF e com dados simplificados
    if (error.status === 413) {
      console.log("Tentando novamente com dados simplificados...");
      try {
        const simplifiedParams = {
          ...baseTemplateParams,
          detailed_responses:
            "<p><strong>📋 Resumo das Respostas</strong><br>Devido ao tamanho dos dados, apenas o resumo está disponível aqui. Consulte o PDF anexo para ver todas as respostas detalhadas.</p>",
          pdf_attachment: null, // Remove PDF para reduzir tamanho
        };

        const retryResponse = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          simplifiedParams
        );

        console.log(
          "Email enviado com sucesso na segunda tentativa:",
          retryResponse
        );
        return {
          success: true,
          data: retryResponse,
          method: "EmailJS (simplificado)",
        };
      } catch (retryError) {
        console.error("Erro na segunda tentativa:", retryError);
      }
    }

    // Fallback para método alternativo
    console.log("Tentando método fallback...");
    return await sendEmailFallback(userInfo, results);
  }
};

const sendEmailFallback = async (userInfo, results) => {
  try {
    const emailData = {
      timestamp: new Date().toISOString(),
      userInfo,
      results: {
        totalScore: results.totalScore,
        categoryScores: results.categoryScores,
        completionDate: results.completionDate,
        answeredQuestions: results.answeredQuestions,
        totalQuestions: results.totalQuestions,
      },
    };

    const existingData = JSON.parse(
      localStorage.getItem("pendingEmails") || "[]"
    );
    existingData.push(emailData);
    localStorage.setItem("pendingEmails", JSON.stringify(existingData));

    console.log("Dados salvos localmente para envio posterior:", emailData);

    const emailBody = `
Novo questionário de startup preenchido!

INFORMAÇÕES DO USUÁRIO:
- Nome da Ideia: ${userInfo.ideaName}
- Nome: ${userInfo.userName}
- E-mail: ${userInfo.email}
- WhatsApp: ${userInfo.whatsapp}

RESULTADOS DA AVALIAÇÃO:
- Pontuação Total: ${results.totalScore.toFixed(1)}/100
- Data de Preenchimento: ${new Date(results.completionDate).toLocaleDateString(
      "pt-BR"
    )}
- Questões Respondidas: ${results.answeredQuestions}/${results.totalQuestions}

PONTUAÇÕES POR CATEGORIA:
${Object.entries(results.categoryScores)
  .map(
    ([, categoryData]) =>
      `- ${categoryData.title}: ${categoryData.average.toFixed(1)}/5.0`
  )
  .join("\n")}

---
Email enviado automaticamente pelo Sistema de Avaliação de Startups da Valiant Group.
    `.trim();

    const subject = `Nova Avaliação de Startup: ${userInfo.ideaName} - ${userInfo.userName}`;
    const mailtoLink = `mailto:contato@valiantgroup.com.br?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;

    if (window.location.hostname === "localhost") {
      window.open(mailtoLink, "_blank");
    }

    return {
      success: true,
      method: "fallback-localStorage",
      note: "Dados salvos localmente. Configure o EmailJS para envio automático.",
      data: emailData,
    };
  } catch (fallbackError) {
    console.error("Erro no fallback:", fallbackError);
    return {
      success: false,
      error: `Erro no fallback: ${fallbackError.message}`,
      method: "fallback-failed",
    };
  }
};
