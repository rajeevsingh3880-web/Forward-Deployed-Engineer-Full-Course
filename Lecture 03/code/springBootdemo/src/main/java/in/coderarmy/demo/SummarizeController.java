package in.coderarmy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SummarizeController {

    @Autowired
    private ChatService summarizeService;

    @PostMapping("/chat")
    public String chat(@RequestBody String message) {
        return summarizeService.chat(message);
    }
}
