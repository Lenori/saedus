<?php

include('./includes/header.php');

$id = $_GET['id'];

?>

<?php

include('./includes/side_menu.php');

?>

<?php if (!isset($id)) : ?>

    <div class="container">

        <div class="data-table">

            <table>
                <tr>
                    <th class="small">ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>

                <?php foreach ($users as $user) : ?>

                    <tr>
                        <td><?php echo $user['id'] ?></td>
                        <td><?php echo $user['fname'] . ' ' . $user['lname'] ?></td>
                        <td><?php echo $user['email'] ?></td>
                        <td><a href="?id=<?php echo $user['id'] ?>"><i class="fas fa-external-link-square-alt"></i></a></td>
                    </tr>

                <?php endforeach; ?>

            </table>

        </div>

    </div>

<?php else : ?>

    <div class="container">

        <div class="item-info">

            <?php foreach ($users AS $user) : ?>

                <?php if ($user['id'] == $id) : ?>

                    <img src="http://18.224.180.162/api/resources/profile/avatar/1.jpg" alt="profile" />

                    <h2><?php echo $user['fname'] . ' ' . $user['lname'] ?></h2>

                    <h3>Description: </h3>
                    <p><?php echo $user['description'] ?></p>

                    <h3>Hourly rate: </h3>
                    <p><?php echo $user['rate'] ?></p>

                    <h3>Address: </h3>
                    <p><?php echo $user['address1'] . ', ' .$user['address2'] ?></p>

                    <h3>City: </h3>
                    <p><?php echo $user['city'] ?></p>

                    <h3>Zip: </h3>
                    <p><?php echo $user['zip'] ?></p>

                    <h2>LEO LENORI'S PROJECTS</h2>

                <?php endif; ?>

            <?php endforeach; ?>

        </div>

        <div class="data-table">

            <table>
                <tr>
                    <th class="small">ID</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>

                <?php foreach ($projects AS $project) : ?>

                    <?php if ($project['owner'] == $id) : ?>

                        <tr>
                            <td><?php echo $project['id'] ?></td>
                            <td><?php echo $project['title'] ?></td>
                            <td><a href="projects.php?id=<?php echo $project['id'] ?>"><i class="fas fa-external-link-square-alt"></i></a></td>
                        </tr>

                    <?php endif; ?>

                <?php endforeach; ?>

            </table>

        </div>

        <button>DELETE</button>

    </div>

<?php endif; ?>

<?php

include('./includes/footer.php');

?>
