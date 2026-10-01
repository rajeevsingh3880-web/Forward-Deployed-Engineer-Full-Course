const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    // Show user message
    addMessage(message, "user");

    // Clear input
    messageInput.value = "";

    // Disable button
    sendButton.disabled = true;

    try {

        console.log("Sending message:", message);

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: message
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const result = await response.text();

        console.log("AI response:", result);

        addMessage(result, "ai");

    } catch (error) {

        console.error("Error:", error);

        addMessage(
            "Unable to connect to the server. Check that Spring Boot is running on port 8080.",
            "ai"
        );

    } finally {

        sendButton.disabled = false;
    }
}


function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message " + sender;

    const content = document.createElement("div");

    content.className = "message-content";

    content.textContent = message;

    messageDiv.appendChild(content);

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}