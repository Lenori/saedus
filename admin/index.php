<?php

include('./includes/header.php');

?>

<?php

include('./includes/side_menu.php');

?>

<div class="container">

    <div class="data-resume">

        <div class="data-item">
            <h2><?php echo count($users) ?></h2>
            <p>Users</p>
        </div>

        <div class="data-item">
            <h2><?php echo count($projects) ?></h2>
            <p>Projects</p>
        </div>

    </div>

</div>

<?php

include('./includes/footer.php');

?>
