<?php get_header(); ?>

<?php
	global $post;
    if(isset($_GET['s'])){
        $searchblog = $_GET['s'];
    } else {
        $searchblog = "";
    }
	$banner_image = get_field('banner_image', 313);
	$banner_image_m = get_field('banner_image_mobile', 313);
	$banner_image_mobile = $banner_image_m ? $banner_image_m : $banner_image;
	$banner_sub_h = get_field('banner_sub_heading', 313);
	if(empty($banner_sub_h)){
		$banner_sub_heading = get_the_title(313);
	} else {
		$banner_sub_heading = $banner_sub_h;
	}
	$banner_heading = get_field('banner_heading', 313);
	$cat_id = get_queried_object()->term_id;
	$args = array(
        's' => $searchblog,
        'post_type' => 'partner',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'orderby' => 'title',
        'order' => 'DESC',
    );
   $totalposts = new WP_Query($args);
   $postscount = $totalposts->found_posts;
   $partner_categories = get_categories('taxonomy=partner_category');
   $partners_count = count($partner_categories);
?>

<section class="partner-banner-section">
    <div class="container">
        <div class="partner-banner-main">
            <div class="partner-banner-title relative aligncenter" data-animation="underline left partners">
                <span class="optional-text"><?php echo $banner_sub_heading; ?></span>
            <?php if(!empty($banner_heading)){ ?>
                <h1><?php echo $banner_heading; ?></h1>
            <?php } ?>
            </div>
        </div>
    </div>
</section>

<section class="partner-block-section">
    <div class="container">
        <div class="partner-block-main flex">
        <?php foreach($partner_categories as $partner_category){
            $partner_category_icon = get_field('partner_category_icon', 'partner_category_'.$partner_category->term_id);
            $partner_category_short_description = get_field('partner_category_short_description', 'partner_category_'.$partner_category->term_id);
        ?>
            <div class="partner-block-list radius-24 partner-block-of-<?php echo $partners_count; ?>">
                <div class="partner-block-title flex">
                <?php if(!empty($partner_category_icon)){ ?>
                    <div class="partner-block-icon flex">
                        <?php echo $partner_category_icon; ?>
                    </div>
                <?php } ?>
                    <h2 class="h5"><a href="<?php echo get_term_link( $partner_category->term_id ); ?>"><?php echo $partner_category->name; ?></a></h2>
                </div>
                <?php if(!empty($partner_category_short_description)){ ?>
                    <?php echo $partner_category_short_description; ?>
                <?php } ?>
            </div>
        <?php } ?>
        </div>
    </div>
</section>

<div class="divider hide-desktop">
    <div class="container">
        <hr class="divider-line">
    </div>
</div>
<section class="partners-section relative">
    <div class="container">
        <div class="partners-main">
            <div class="tabs-filter-row">
                <div class="tabs-filter flex flex-vcenter">
                    <form action="<?php echo home_url( '/' ); ?>" class="res-srch-form relative" method="get">
                        <div class="res-srch-field radius-8">
                            <input type="text" name="s" id="s" value="<?php echo $searchblog; ?>" placeholder="Search all partners">
                            <input type="hidden" name="search_option" value="partners">
                        </div>
                        <button class="res-expand-icon absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path opacity="0.5" d="M18.5 11C14.3579 11 11 14.3579 11 18.5C11 22.6421 14.3579 26 18.5 26C22.6421 26 26 22.6421 26 18.5C26 14.3579 22.6421 11 18.5 11Z" fill="#A4278F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 18.5782C4 10.5269 10.5269 4 18.5782 4C26.6295 4 33.1564 10.5269 33.1564 18.5782C33.1564 21.4217 32.3423 24.0751 30.9345 26.3179C31.0786 26.4377 31.2227 26.5572 31.3664 26.6765L31.4139 26.7158C32.576 27.6797 33.7296 28.6366 34.869 29.6931C36.2366 30.9614 36.4253 32.934 35.0963 34.3087C34.9744 34.4347 34.8445 34.5669 34.7062 34.7053C34.5678 34.8437 34.4358 34.9737 34.3098 35.0956C32.9359 36.4258 30.9643 36.2369 29.6968 34.8682C28.6411 33.728 27.6849 32.5737 26.7217 31.4107L26.3239 30.9307C24.0798 32.3409 21.4242 33.1564 18.5782 33.1564C10.5269 33.1564 4 26.6295 4 18.5782ZM7.55469 18.5782C7.55469 12.4906 12.4897 7.55566 18.5772 7.55566C24.6648 7.55566 29.5998 12.4906 29.5998 18.5782C29.5998 24.6658 24.6648 29.6008 18.5772 29.6008C12.4897 29.6008 7.55469 24.6658 7.55469 18.5782Z" fill="#A4278F"/>
                              </svg>
                        </button>
                        <button class="res-srch-icon absolute" aria-label="Expand Resources">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path opacity="0.5" d="M18.5 11C14.3579 11 11 14.3579 11 18.5C11 22.6421 14.3579 26 18.5 26C22.6421 26 26 22.6421 26 18.5C26 14.3579 22.6421 11 18.5 11Z" fill="#A4278F"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 18.5782C4 10.5269 10.5269 4 18.5782 4C26.6295 4 33.1564 10.5269 33.1564 18.5782C33.1564 21.4217 32.3423 24.0751 30.9345 26.3179C31.0786 26.4377 31.2227 26.5572 31.3664 26.6765L31.4139 26.7158C32.576 27.6797 33.7296 28.6366 34.869 29.6931C36.2366 30.9614 36.4253 32.934 35.0963 34.3087C34.9744 34.4347 34.8445 34.5669 34.7062 34.7053C34.5678 34.8437 34.4358 34.9737 34.3098 35.0956C32.9359 36.4258 30.9643 36.2369 29.6968 34.8682C28.6411 33.728 27.6849 32.5737 26.7217 31.4107L26.3239 30.9307C24.0798 32.3409 21.4242 33.1564 18.5782 33.1564C10.5269 33.1564 4 26.6295 4 18.5782ZM7.55469 18.5782C7.55469 12.4906 12.4897 7.55566 18.5772 7.55566C24.6648 7.55566 29.5998 12.4906 29.5998 18.5782C29.5998 24.6658 24.6648 29.6008 18.5772 29.6008C12.4897 29.6008 7.55469 24.6658 7.55469 18.5782Z" fill="#A4278F"/>
                              </svg>                    
                        </button>
                    </form>
                    <div class="tab-divider hide-mobile"></div>
                    <div class="tab-links-d flex relative" data-name="Partner-Category">
                        <span class="tab-link-text">Partner Category</span>
                        <div class="tab-link-svgs absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.84807 12.6826C9.93153 12.757 10.057 12.757 10.1406 12.6828C10.7607 12.1316 13.2862 9.88437 16.4566 7.03162C16.9427 6.59429 17.5969 6.3355 18.1807 6.63C18.4392 6.76046 18.727 6.952 19.0147 7.23333C19.3497 7.56087 19.5602 7.88829 19.6925 8.17058C19.9299 8.67708 19.7427 9.24133 19.398 9.68183C16.9952 12.752 13.5514 15.7832 11.5669 17.4291C10.6493 18.1902 9.33899 18.1903 8.4214 17.4294C6.4364 15.7833 2.99278 12.7515 0.59753 9.68087C0.254488 9.24113 0.0684872 8.6785 0.304613 8.17325C0.436821 7.89037 0.647612 7.56187 0.983612 7.23337C1.27119 6.95221 1.55874 6.76066 1.81707 6.63025C2.40103 6.33533 3.0557 6.59408 3.54195 7.03175C6.71074 9.884 9.2294 12.131 9.84807 12.6826Z" fill="#A4278F"/>
                                <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M9.84807 12.6826C9.93153 12.757 10.057 12.757 10.1406 12.6828C10.7607 12.1316 13.2862 9.88437 16.4566 7.03162C16.9427 6.59429 17.5969 6.3355 18.1807 6.63C18.4392 6.76046 18.727 6.952 19.0147 7.23333C19.3497 7.56087 19.5602 7.88829 19.6925 8.17058C19.9299 8.67708 19.7427 9.24133 19.398 9.68183C16.9952 12.752 13.5514 15.7832 11.5669 17.4291C10.6493 18.1902 9.33899 18.1903 8.4214 17.4294C6.4364 15.7833 2.99278 12.7515 0.59753 9.68087C0.254488 9.24113 0.0684872 8.6785 0.304613 8.17325C0.436821 7.89037 0.647612 7.56187 0.983612 7.23337C1.27119 6.95221 1.55874 6.76066 1.81707 6.63025C2.40103 6.33533 3.0557 6.59408 3.54195 7.03175C6.71074 9.884 9.2294 12.131 9.84807 12.6826Z" fill="#A4278F"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.84807 7.31742C9.93153 7.24304 10.057 7.24296 10.1406 7.31721C10.7607 7.86842 13.2862 10.1156 16.4566 12.9684C16.9427 13.4057 17.5969 13.6645 18.1807 13.37C18.4392 13.2395 18.727 13.048 19.0147 12.7667C19.3497 12.4391 19.5602 12.1117 19.6925 11.8294C19.9299 11.3229 19.7427 10.7587 19.398 10.3182C16.9952 7.24804 13.5514 4.21679 11.5669 2.57088C10.6493 1.80983 9.33899 1.80967 8.4214 2.57062C6.4364 4.21667 2.99278 7.2485 0.59753 10.3191C0.254488 10.7589 0.0684872 11.3215 0.304613 11.8268C0.436821 12.1096 0.647612 12.4381 0.983612 12.7666C1.27119 13.0478 1.55874 13.2393 1.81707 13.3698C2.40103 13.6647 3.0557 13.4059 3.54195 12.9683C6.71074 10.116 9.2294 7.869 9.84807 7.31742Z" fill="#3BAFD3"/>
                                <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M9.84807 7.31742C9.93153 7.24304 10.057 7.24296 10.1406 7.31721C10.7607 7.86842 13.2862 10.1156 16.4566 12.9684C16.9427 13.4057 17.5969 13.6645 18.1807 13.37C18.4392 13.2395 18.727 13.048 19.0147 12.7667C19.3497 12.4391 19.5602 12.1117 19.6925 11.8294C19.9299 11.3229 19.7427 10.7587 19.398 10.3182C16.9952 7.24804 13.5514 4.21679 11.5669 2.57088C10.6493 1.80983 9.33899 1.80967 8.4214 2.57062C6.4364 4.21667 2.99278 7.2485 0.59753 10.3191C0.254488 10.7589 0.0684872 11.3215 0.304613 11.8268C0.436821 12.1096 0.647612 12.4381 0.983612 12.7666C1.27119 13.0478 1.55874 13.2393 1.81707 13.3698C2.40103 13.6647 3.0557 13.4059 3.54195 12.9683C6.71074 10.116 9.2294 7.869 9.84807 7.31742Z" fill="#3BAFD3"/>
                                </svg>
                        </div>
                    </div>
                </div>
                <div class="tab-links-main" data-value="Partner-Category">
                    <ul class="tab-links flex flex-vcenter">
                    <?php $i=1; foreach($partner_categories as $partner_category){ ?>
                        <li>
                            <a href="<?php echo get_term_link( $partner_category->term_id ); ?>" data-name="tab-row-<?php echo $i; ?>" class="flex flex-vcenter f-700 radius-20">
                                <?php echo $partner_category->name; ?>
                            <span class="close-icon">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" role="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.342634 8.69611C-0.0249634 9.09646 -0.127808 9.65741 0.189241 10.0989C0.371074 10.3521 0.626438 10.662 0.982353 11.018C1.33827 11.3739 1.64822 11.6292 1.9014 11.8111C2.34291 12.1281 2.90386 12.0253 3.30421 11.6577C3.81717 11.1866 4.67252 10.3808 6.00016 9.07577C7.3278 10.3808 8.18314 11.1866 8.69611 11.6577C9.09646 12.0253 9.65741 12.1281 10.0989 11.8111C10.3521 11.6293 10.662 11.3739 11.018 11.018C11.3739 10.662 11.6293 10.3521 11.8111 10.0989C12.1281 9.65746 12.0253 9.09646 11.6577 8.69611C11.1866 8.18314 10.3808 7.3278 9.07577 6.00016C10.381 4.67235 11.1869 3.8169 11.658 3.30388C12.0256 2.90353 12.1285 2.34258 11.8114 1.90107C11.6296 1.64789 11.3742 1.33794 11.0183 0.982025C10.6624 0.62611 10.3524 0.370747 10.0992 0.188913C9.65779 -0.128135 9.09679 -0.0252914 8.69644 0.342306C8.18342 0.813402 7.32796 1.61934 6.00016 2.92455C4.67235 1.61934 3.8169 0.813402 3.30388 0.342306C2.90353 -0.0252914 2.34258 -0.128135 1.90107 0.188913C1.64789 0.370747 1.33794 0.62611 0.982026 0.982025C0.62611 1.33794 0.370747 1.64789 0.188913 1.90107C-0.128135 2.34258 -0.0252914 2.90353 0.342306 3.30388C0.813402 3.8169 1.61934 4.67235 2.92455 6.00016C1.61956 7.3278 0.81373 8.18314 0.342634 8.69611Z" fill="#227C98"/>
                                </svg>
                            </span>
                            </a>
                        </li>
                        <?php $i++; } ?>
                        <li><a class="clear flex flex-vcenter f-700 radius-20" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_2905_9710)">
                              <path opacity="0.3" d="M2.17335 5.26388C2.26022 5.17334 2.38256 5.12571 2.50781 5.13367C3.81022 5.21642 6.08143 5.3133 9.57522 5.3133C13.0688 5.3133 15.3396 5.21642 16.6419 5.13367C16.7672 5.12576 16.8895 5.17338 16.9764 5.26388C17.0633 5.35442 17.1058 5.47867 17.0927 5.60342C16.8913 7.51996 16.6519 9.31417 16.4074 10.9215C16.1119 10.8745 15.8204 10.8524 15.5399 10.8524H13.2541C13.0789 10.2942 12.6922 9.82605 12.148 9.57176C11.372 9.20913 10.4974 9.40084 9.85793 9.93305C9.12768 10.5409 8.37931 11.1652 7.77243 11.8978C7.03335 12.79 7.03351 14.0278 7.77247 14.9198C8.37947 15.6525 9.12789 16.2769 9.85818 16.8849C10.4986 17.4163 11.3713 17.6093 12.1481 17.2463C12.3962 17.1303 12.6116 16.9699 12.7891 16.7768C12.8286 16.7338 12.8965 16.7304 12.9378 16.7717C12.973 16.8069 12.9764 16.8627 12.9479 16.9034C12.7649 17.1647 12.6364 17.4837 12.5933 17.8645C12.544 18.3001 12.544 18.7434 12.5933 19.179C12.6075 19.3043 12.6309 19.4228 12.6625 19.5349C11.8703 19.684 10.8457 19.8 9.57522 19.8C7.7291 19.8 6.4021 19.555 5.55318 19.3195C4.67414 19.0756 4.11743 18.3326 3.93956 17.5069C3.51181 15.5208 2.63022 11.0574 2.05701 5.60342C2.04393 5.47863 2.08647 5.35442 2.17335 5.26388Z" fill="#A4278F"/>
                              <path d="M8.22933 0.199219C7.44725 0.199219 6.76558 0.731469 6.57587 1.49018L6.46441 1.93609C4.76337 1.97197 3.45358 2.03001 2.67683 2.07076C2.07133 2.10255 1.41424 2.36368 1.07079 2.98309C0.91687 3.26076 0.76237 3.6138 0.663911 4.03151C0.636453 4.14805 0.626953 4.26197 0.626953 4.3673C0.626953 5.19434 1.24737 5.89889 2.09099 5.95864C3.33779 6.04689 5.72054 6.1643 9.57491 6.1643C13.4291 6.1643 15.8115 6.04693 17.0582 5.95864C17.9017 5.89889 18.5222 5.19434 18.5222 4.3673C18.5222 4.26197 18.5127 4.14805 18.4852 4.03151C18.3868 3.6138 18.2323 3.26076 18.0783 2.98309C17.7349 2.36368 17.0778 2.10255 16.4723 2.07076C15.6956 2.03001 14.3859 1.97197 12.6851 1.93609L12.5735 1.49018C12.3839 0.731469 11.7022 0.199219 10.9202 0.199219H8.22933Z" fill="#A4278F"/>
                              <path d="M10.7372 15.9527C11.3073 16.41 12.0383 16.0618 12.0792 15.3321C12.0892 15.1542 12.0984 14.9617 12.1062 14.7552H15.5396C16.1787 14.7552 16.8178 15.1125 16.8178 15.9646C16.8178 16.8167 16.1787 17.2429 15.5396 17.2429H14.8383C14.3541 17.2429 13.9176 17.5266 13.8631 18.0077C13.8462 18.1569 13.8352 18.3281 13.8352 18.5211C13.8352 18.7141 13.8462 18.8852 13.8631 19.0345C13.9176 19.5156 14.3541 19.7993 14.8383 19.7993H15.5396C17.2439 19.7993 19.3743 18.7341 19.3743 15.9646C19.3743 13.1951 17.2439 12.1299 15.5396 12.1299H12.1087C12.1004 11.8975 12.0902 11.6821 12.0792 11.4847C12.0383 10.7548 11.3071 10.4066 10.7368 10.8639C10.502 11.0523 10.2305 11.2784 9.92045 11.5489C9.36854 12.0303 9.00033 12.4182 8.75641 12.7126C8.40929 13.1316 8.40933 13.6847 8.75649 14.1037C9.00037 14.3981 9.36858 14.7859 9.92045 15.2674C10.2307 15.538 10.5022 15.7643 10.7372 15.9527Z" fill="#A4278F"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_2905_9710">
                                <rect width="20" height="20" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>Clear</a></li>
                    </ul>
                </div>
                <?php if(!empty($searchblog )){?>
                    <div class="search-wrap" id="search-result">
                        <h4>Search Result For: <?php echo $searchblog; ?> </h4>
                    </div>
                    <script>
                        jQuery(function(){ 
                            jQuery(".res-srch-icon").trigger('click');
                        });
                    </script>
                <?php } ?>
            </div>
            <div class="partners-data-tab-rows">
                <div class="partners-data-tab-row open" data-tab="partners-tab-row-1">
	           	<div id="load-more-partners">
	                <ul class="listing blog_list resources-blog-row flex" id="blog_list" data-path="<?php bloginfo('stylesheet_directory'); ?>" 
	                    data-post-type="partner" data-taxonomy="event_categories" data-category="" 
	                    data-postscount="<?php echo $postscount; ?>" data-pagenumber="<?php echo $pagenumber; ?>" 
	                    data-display-posts="9" data-post-not-in="" data-button-text="Show more" data-searchblog="<?php echo $searchblog; ?>">
	                </ul>
	            </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php echo partners_accreditations(); ?>
<?php echo get_more_maxassist(); ?>
</main>
<?php get_footer();
