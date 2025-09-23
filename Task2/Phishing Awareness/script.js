const suspiciousKeywords = ["verify", "secure", "login", "urgent", "update", "reset", "bank"];
const riskyTLDs = [".ru", ".cn", ".xyz", ".top", ".zip", ".mov"];

function revealTip(id) {
  document.getElementById(id).classList.remove("hidden");
}

function checkQuiz(isCorrect) {
  let result = document.getElementById("quiz-result");
  if (isCorrect) {
    result.textContent = "✅ Correct! HTTPS and official domain.";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Fake domain often used in phishing.";
    result.style.color = "red";
  }
}

function checkEmail() {
  let email = document.getElementById("emailInput").value.trim();
  let result = document.getElementById("check-result");

  if (email === "") {
    result.textContent = "⚠️ Please enter an email address.";
    result.style.color = "orange";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    result.textContent = "❌ Invalid email format.";
    result.style.color = "red";
    return;
  }
                                        
  let findings = [];

  if (suspiciousKeywords.some(k => email.toLowerCase().includes(k))) {
    findings.push("Contains phishing-related keywords.");
  }

  riskyTLDs.forEach(tld => {
    if (email.toLowerCase().endsWith(tld)) {
      findings.push("Ends with risky top-level domain.");
    }
  });

  if (findings.length === 0) {
    result.textContent = "✅ No obvious red flags, but always double-check.";
    result.style.color = "green";
  } else {
    result.innerHTML = "⚠️ Issues found:<br>• " + findings.join("<br>• ");
    result.style.color = "orange";
  }
}

function checkURL() {
  let url = document.getElementById("urlInput").value.trim();
  let result = document.getElementById("url-result");

  if (url === "") {
    result.textContent = "⚠️ Please enter a website link.";
    result.style.color = "orange";
    return;
  }

  let findings = [];

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    findings.push("Does not start with http/https.");
  }

  if (suspiciousKeywords.some(k => url.includes(k))) {
    findings.push("Contains phishing-related keywords.");
  }

  riskyTLDs.forEach(tld => {
    if (url.endsWith(tld)) {
      findings.push("Ends with risky top-level domain.");
    }
  });

  if (url.length > 75) {
    findings.push("Unusually long URL (phishers hide content).");
  }

  if (findings.length === 0) {
    result.textContent = "✅ This URL looks safe (but always verify).";
    result.style.color = "green";
  } else {
    result.innerHTML = "⚠️ Possible issues:<br>• " + findings.join("<br>• ");
    result.style.color = "orange";
  }
}
