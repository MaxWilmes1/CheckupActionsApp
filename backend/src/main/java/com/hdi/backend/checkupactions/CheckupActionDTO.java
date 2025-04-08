package com.hdi.backend.checkupactions;

import lombok.Builder;
import lombok.With;
import java.util.Objects;

@Builder
@With
public record CheckupActionDTO(
        String title,
        String subtitle,
        String art,
        String adu,
        String application,
        String cinum,
        String pi,
        String description,
        String responsibility
) {

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CheckupActionDTO that = (CheckupActionDTO) o;
        return Objects.equals(pi, that.pi) && Objects.equals(art, that.art) && Objects.equals(adu, that.adu) && Objects.equals(title, that.title) && Objects.equals(cinum, that.cinum) && Objects.equals(subtitle, that.subtitle) && Objects.equals(application, that.application) && Objects.equals(description, that.description) && Objects.equals(responsibility, that.responsibility);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, subtitle, art, adu, application, cinum, pi, description, responsibility);
    }

    @Override
    public String toString() {
        return "CheckupActionDTO{" +
                "adu='" + adu + '\'' +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", art='" + art + '\'' +
                ", application='" + application + '\'' +
                ", cinum='" + cinum + '\'' +
                ", pi='" + pi + '\'' +
                ", description='" + description + '\'' +
                ", responsibility='" + responsibility + '\'' +
                '}';
    }
}
