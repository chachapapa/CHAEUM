package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "reply")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Reply {

    @Id
    @Column(name = "reply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
    private Activity activityId;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserPersonalInfo userId;

    @Column(name = "content")
    private String content;

    @Column(name = "is_cheer")
    private Boolean isCheer;

    @CreationTimestamp
    @Column(name = "reply_time")
    private Date replyTime;

    @Column(name = "rereply_id")
    private Long rereplyId;

    @Column(name = "reply_deleted")
    private Boolean replyDeleted;

}