package com.hdi.backend.checkupactions.title;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/title")
@RequiredArgsConstructor
public class TitleController {

    private final TitleService titleService;

    @GetMapping
    public List<Title> getAllTitles(){
        return titleService.getAllTitles();
    }

    @GetMapping("/{id}")
    public Title getTitleById(@PathVariable String id){
        return titleService.getTitleById(id);
    }

    @PostMapping
    public Title addTitle(@RequestBody Title title){
        return titleService.addTitle(title);
    }

    @PutMapping("/{id}")
    public Title updateTitle(@PathVariable String id, @RequestBody Title title){
        return titleService.updateTitle(id, title);
    }

    @DeleteMapping("/{id}")
    public void deleteTitle(@PathVariable String id){
        titleService.deleteTitle(id);
    }
}
