package com.hdi.backend.checkupactions;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.Objects;

@Builder
@With
@Document
public record CheckupAction(
        @Id String id,
        String title,
        String subtitle,
        String art,
        String adu,
        String application,
        String cinum,
        String pi,
        String description,
        String responsibility,
        LocalDateTime dateCreated,
        LocalDateTime dateLastEdit
) {
    @Override
    public String toString() {
        return "CheckupAction{" +
                "adu='" + adu + '\'' +
                ", id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", art='" + art + '\'' +
                ", application='" + application + '\'' +
                ", cinum='" + cinum + '\'' +
                ", pi='" + pi + '\'' +
                ", description='" + description + '\'' +
                ", responsibility='" + responsibility + '\'' +
                ", dateCreated=" + dateCreated +
                ", dateLastEdit=" + dateLastEdit +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CheckupAction that = (CheckupAction) o;
        return Objects.equals(id, that.id) && Objects.equals(pi, that.pi) && Objects.equals(art, that.art) && Objects.equals(adu, that.adu) && Objects.equals(title, that.title) && Objects.equals(cinum, that.cinum) && Objects.equals(subtitle, that.subtitle) && Objects.equals(application, that.application) && Objects.equals(description, that.description) && Objects.equals(dateCreated, that.dateCreated) && Objects.equals(dateLastEdit, that.dateLastEdit) && Objects.equals(responsibility, that.responsibility);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, subtitle, art, adu, application, cinum, pi, description, responsibility, dateCreated, dateLastEdit);
    }

}
