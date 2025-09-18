document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
        signUpForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const birthDate = document.getElementById("birthDate").value;

            
            let valid = true;
            document.getElementById("name-error").textContent = "";
            document.getElementById("email-error").textContent = "";
            document.getElementById("password-error").textContent = "";
            document.getElementById("confirmPassword-error").textContent = "";
            document.getElementById("birthDate-error").textContent = "";

            if (name.length < 3) {
                document.getElementById("name-error").textContent = "Nome deve ter pelo menos 3 caracteres";
                valid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById("email-error").textContent = "Email inválido";
                valid = false;
            }
            if (password.length < 6) {
                document.getElementById("password-error").textContent = "Senha deve ter pelo menos 6 caracteres";
                valid = false;
            }
            if (password !== confirmPassword) {
                document.getElementById("confirmPassword-error").textContent = "Senhas não conferem";
                valid = false;
            }
            if (!birthDate) {
                document.getElementById("birthDate-error").textContent = "Informe a data de nascimento";
                valid = false;
            }

            if (!valid) return;

            const newUser = {
                name,
                email,
                password,
                birthDate
            };

            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });

                if (!response.ok) throw new Error("Falha ao cadastrar usuário");

                alert("Usuário cadastrado com sucesso!");
                window.location.href = "../Login/Login.html";
            } catch (error) {
                alert("Erro no cadastro: " + error.message);
            }
        });
    }
});