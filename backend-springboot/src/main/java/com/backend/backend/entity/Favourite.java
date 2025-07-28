package com.backend.backend.entity;

import jakarta.persistence.*;

@Entity
public class Favourite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private Long gameId;
    private String gameName;

    @Column(columnDefinition = "TEXT")
    private String gameScreenshots;


    public Favourite() {}

    public Favourite(String userId, Long gameId, String gameName, String gameScreenshots) {
        this.userId = userId;
        this.gameId = gameId;
        this.gameName = gameName;
        this.gameScreenshots = gameScreenshots;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getGameScreenshots() {
        return gameScreenshots;
    }

    public void setGameScreenshots(String gameScreenshots) {
        this.gameScreenshots = gameScreenshots;
    }

}