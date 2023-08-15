package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    @Column(name = "post_time")
    private String postTime;

    @Column(name = "post_content")
    private String postContent;

    @Column(name = "post_enable")
    private boolean postEnable;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserPersonalInfo userPersonalInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id")
    private Activity activity;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private List<File> fileList;

    public void changePostTime(String postTime){
        this.postTime = postTime;
    }

    public void changePostContent(String postContent){
        this.postContent = postContent;
    }

    public void changePostEnable(){
        this.postEnable = false;
    }
}
