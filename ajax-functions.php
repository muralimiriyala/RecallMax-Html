<?php

add_action('wp_ajax_get_team_members', 'get_team_members');
add_action('wp_ajax_nopriv_get_team_members', 'get_team_members');

function get_team_members()
{ ?>
   
                <div class="data-tab-row open" data-tab="tab-row-1">
                <div class="tabs-row flex flex-center">
                <?php
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';

    $args = array(
        'post_type' => 'team',
        'posts_per_page' => -1,
        'tax_query' => array(
            array(
                'taxonomy' => 'team_category',
                'field'    => 'slug',
                'terms'    => $category,
            ),
        ),
    );

    // The query
    $team_query = new WP_Query($args);
    $output = '';

    if ($team_query->have_posts()) {
        while ($team_query->have_posts()) {
            $team_query->the_post();
            $team_profile_image = get_field('team_profile_image');
            $team_profile_short_description = get_field('team_profile_short_description');
            $team_profile_position = get_field('team_profile_position');
            if(!empty($team_profile_short_description)) { $clickable = "tab-text tab-slide-up"; }else{ $clickable = "tab-text";}
            if ($team_profile_image || $team_profile_short_description || $team_profile_position) { ?>
                <div class="tab-list relative radius-16 o-hidden">
                    <?php if ($team_profile_image) : ?>
                        <div class="tab-image">
                            <figure class="object-fit">
                                <img src="<?php echo $team_profile_image['url']; ?>" alt="<?php echo $team_profile_image['alt']; ?>">
                            </figure>
                        </div>
                    <?php endif; ?>

                    <div class="<?php echo $clickable; ?> absolute radius-12">
                        <div class="tab-head flex">
                            <div class="tab-title">
                                <h2 class="h3"><?php the_title(); ?></h2>
                                <?php if ($team_profile_position) : ?>
                                    <span><?php echo $team_profile_position; ?></span>
                                <?php endif; ?>
                            </div>
                            <?php if (!empty($team_profile_short_description)){ ?>
                            <div class="tab-arrow fs-20">
                                <svg class="tab-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" role="none">
                                    <g clip-path="url(#clip0_3889_8394)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.84807 5.56937C9.93153 5.495 10.057 5.49491 10.1406 5.56916C10.7607 6.12037 13.2862 8.36758 16.4566 11.2203C16.9427 11.6577 17.5969 11.9165 18.1807 11.622C18.4392 11.4915 18.727 11.3 19.0147 11.0186C19.3497 10.6911 19.5602 10.3637 19.6925 10.0814C19.9299 9.57487 19.7427 9.01062 19.398 8.57012C16.9952 5.49999 13.5514 2.46875 11.5669 0.822828C10.6493 0.0617866 9.33899 0.0616196 8.4214 0.822578C6.4364 2.46862 2.99278 5.50045 0.59753 8.57108C0.254488 9.01083 0.0684878 9.57345 0.304613 10.0787C0.436821 10.3616 0.647612 10.6901 0.983612 11.0186C1.27119 11.2997 1.55874 11.4913 1.81707 11.6217C2.40103 11.9166 3.0557 11.6579 3.54195 11.2202C6.71074 8.36795 9.2294 6.12095 9.84807 5.56937Z" fill="#A4278F" />
                                        <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M9.84807 13.5694C9.93153 13.495 10.057 13.4949 10.1406 13.5692C10.7607 14.1204 13.2862 16.3676 16.4566 19.2203C16.9427 19.6577 17.5969 19.9165 18.1807 19.622C18.4392 19.4915 18.727 19.3 19.0147 19.0186C19.3497 18.6911 19.5602 18.3637 19.6925 18.0814C19.9299 17.5749 19.7427 17.0106 19.398 16.5701C16.9952 13.5 13.5514 10.4687 11.5669 8.82283C10.6493 8.06179 9.33899 8.06162 8.4214 8.82258C6.4364 10.4686 2.99278 13.5005 0.59753 16.5711C0.254488 17.0108 0.0684878 17.5735 0.304613 18.0787C0.436821 18.3616 0.647612 18.6901 0.983612 19.0186C1.27119 19.2997 1.55874 19.4913 1.81707 19.6217C2.40103 19.9166 3.0557 19.6579 3.54195 19.2202C6.71074 16.368 9.2294 14.121 9.84807 13.5694Z" fill="#A4278F" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3889_8394">
                                            <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <?php } ?>
                        </div>

                        <?php if ($team_profile_short_description) : ?>
                            <div class="tab-desc">
                                <div class="tab-desc-pad fs-18">
                                    <?php echo $team_profile_short_description; ?>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
<?php  } else {
                $output .= '<p>No team members found in this category.</p>';
            }
        }
    }

    wp_reset_postdata(); ?>

</div>
</div>

  <?php  echo $output;
    wp_die();
}

