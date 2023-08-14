package com.cocochacha.chaeumbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity(name = "friend_log")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FriendLog {

    @Id
    @Column(name = "friend_log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "friend_relationship_id", referencedColumnName = "friend_info_id")
    private FriendRelationship friendRelationshipId;

    @Column(name = "friend_log_time")
    @CreationTimestamp
    private Date friendLogTime;

    @Builder
    public FriendLog(FriendRelationship friendRelationshipId) {
        this.friendRelationshipId = friendRelationshipId;
    }
}

