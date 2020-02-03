<?php

include('./includes/header.php');

?>

<?php

include('./includes/side_menu.php');

?>

<div class="container">

    <div class="data-table">

        <table>
            <tr>
                <th class="small">ID</th>
                <th>Name</th>
                <th>Delete</th>
            </tr>

            <?php foreach ($categories as $cat) : ?>

                <tr>
                    <td><?php echo $cat['id'] ?></td>
                    <td><?php echo $cat['name'] ?></td>
                    <td><a href="?delete=true&type=3&id=<?php echo $cat['id'] ?>"><i class="fas fa-trash-alt"></i></a></td>
                </tr>

            <?php endforeach; ?>

        </table>

    </div>

    <div class="form">

        <form method="post">

            <h2>Add new category</h2>

            <input type="hidden" name="cmd" value="add_cat" />
            <input type="text" name="name" required placeholder="Category name" />

            <button>Add category</button>

        </form>

    </div>

</div>

<?php

include('./includes/footer.php');

?>
