<?php

include('./includes/header.php');

?>

<?php

include('./includes/login.php');

?>

<div class="form">
    <form method="post">

        <h2>Login</h2>

        <input type="text" name="email" placeholder="Enter your email" required>
        <input type="password" name="password" placeholder="Enter your password" required>

        <button type="submit">Login</button>

    </form>

</div>
