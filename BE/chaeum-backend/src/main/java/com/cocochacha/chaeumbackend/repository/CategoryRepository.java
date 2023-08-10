package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByCategoryMainAndCategoryMiddle(String categoryMain, String categoryMiddle);

    Optional<List<Category>> findAllByCategoryMain(String categoryMain);
}

