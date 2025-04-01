package com.hdi.backend.checkupactions.title;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TitleService {

    private final TitleRepository titleRepository;

    public List<Title> getTitles() {
        return titleRepository.findAll();
    }

    public Title getTitleById(String id) {
        return titleRepository.findById(id)
                .orElseThrow();
    }

    public Title addTitle(Title title) {
        return titleRepository.save(title);
    }

    public Title updateTitle(String id, Title title) {
        Title titleToUpdate = getTitleById(id);
        Title updatedTitle = titleToUpdate.withTitle(title.title());
        return titleRepository.save(updatedTitle);

    }

    public void deleteTitle(String id) {
        titleRepository.deleteById(id);
    }
}
