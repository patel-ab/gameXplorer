package com.backend.backend.controller;


import com.backend.backend.entity.Favourite;
import com.backend.backend.repository.FavouriteRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/favourites")
@CrossOrigin(origins = "*")
public class FavouriteController {

    @Autowired
    private FavouriteRepository favRepo;

    @GetMapping
    public List<Favourite> getAll() {
        return favRepo.findAll();
    }

    @PostMapping
    public Favourite add(@RequestBody Favourite fav) {
        return favRepo.save(fav);
    }

    @GetMapping("/user/{userId}")
    public List<Favourite> getByUserId(@PathVariable String userId) {
        return favRepo.findByUserId(userId);
    }

    @GetMapping("/screenshots/user/{userId}")
    public List<String> getScreenshotsByUser(@PathVariable String userId) {
        List<Favourite> favourites = favRepo.findByUserId(userId);
        List<String> allScreenshots = new ArrayList<>();

        for (Favourite fav : favourites) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<String> screenshots = mapper.readValue(fav.getGameScreenshots(), new TypeReference<List<String>>() {});
                allScreenshots.addAll(screenshots);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return allScreenshots;
    }
}
