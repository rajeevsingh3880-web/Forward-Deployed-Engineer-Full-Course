package in.coderarmy.demo;

import in.coderarmy.demo.aitools.CalculatorTool;
import in.coderarmy.demo.aitools.CurrencyExchangeTool;
import in.coderarmy.demo.aitools.WeatherTool;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final CalculatorTool calculatorTool;
    private final WeatherTool weatherTool;
    private final CurrencyExchangeTool currencyExchangeTool;

    private final List<Message> history = new ArrayList<>();

    private static final String SYSTEM_PROMPT = """
            You are a helpful AI assistant with access to external tools.

            Follow these rules:
            1. For arithmetic calculations, always use the calculator tool.
            2. Always use calculator tool for even trivial calculation.
            3. For current weather questions, always use the weather tool.
            4. For currency exchange questions, always use the currency exchange tool.
            5. You may call multiple tools when solving a multi-step request.
            6. After receiving tool results, explain the answer naturally.
            7. never invent current weather or exchange-rate information.
            """;

    public ChatService(
            ChatClient.Builder builder,
            CalculatorTool calculatorTool,
            WeatherTool weatherTool,
            CurrencyExchangeTool currencyExchangeTool) {

        this.chatClient = builder.build();
        this.calculatorTool = calculatorTool;
        this.weatherTool = weatherTool;
        this.currencyExchangeTool = currencyExchangeTool;
    }

    public String chat(String message) {

        history.add(new UserMessage(message));

        String output = chatClient.prompt()
                .system(SYSTEM_PROMPT)
                .messages(history)
                .tools(
                        calculatorTool,
                        weatherTool,
                        currencyExchangeTool
                )
                .call()
                .content();

        history.add(new AssistantMessage(output));

        return output;
    }
}