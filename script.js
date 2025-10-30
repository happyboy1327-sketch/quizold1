console.log("✅ 스크립트 로드됨");

async function fetchQuiz() {
  try {
    const res = await fetch("/api/quiz/today");
    if (!res.ok) throw new Error("API 실패: " + res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("🚨 API 오류:", err);
    return [];
  }
}

async function displayQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "<p>로딩 중...</p>";

  const quizzes = await fetchQuiz();

  if (quizzes.length === 0) {
    container.innerHTML = "<p>퀴즈를 불러오지 못했습니다.</p>";
    return;
  }

  container.innerHTML = "";
  quizzes.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "quiz-item";
    div.innerHTML = `
      <h3>문제 ${idx + 1}: ${q.name}</h3>
      <p>힌트: ${q.hint}</p>
      <img src="${q.image}" alt="${q.name}">
    `;
    container.appendChild(div);
  });
}

document.getElementById("reload-btn").addEventListener("click", displayQuiz);
window.addEventListener("DOMContentLoaded", displayQuiz);
