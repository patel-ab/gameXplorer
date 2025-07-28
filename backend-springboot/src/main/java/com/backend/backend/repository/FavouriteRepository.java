package com.backend.backend.repository;

import com.backend.backend.entity.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite,Long> {
    List<Favourite> findByUserId(String userId);
}
