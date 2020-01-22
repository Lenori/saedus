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
                    <th>Title</th>
                    <th>Owner</th>
                    <th>Actions</th>
                </tr>

                <?php foreach ($projects AS $project) : ?>

                    <tr>
                        <td><?php echo $project['id'] ?></td>
                        <td><?php echo $project['title'] ?></td>
                        <td><?php echo $project['owner_fname'] . ' ' . $project['owner_lname'] ?></td>
                        <td><a href="?id=<?php echo $project['id'] ?>"><i class="fas fa-external-link-square-alt"></i></a></td>
                    </tr>

                <?php endforeach; ?>

            </table>

        </div>

    </div>

<?php else : ?>

    <div class="container">

        <div class="item-info">

            <?php foreach ($projects AS $project) : ?>

                <?php if ($project['id'] == $id) : ?>

                    <h2><?php echo $project['title'] ?></h2>

                    <h3>Description: </h3>
                    <p><?php echo $project['description'] ?></p>

                    <h3>Budget: </h3>
                    <p>CAD $<?php echo $project['budget'] ?></p>

                    <h3>Status: </h3>
                    <?php if ($project['status'] == 0) : ?>
                        <p>Posted</p>
                    <?php elseif ($project['status'] == 1) : ?>
                        <p>Awarded</p>
                    <?php elseif ($project['status'] == 2) : ?>
                        <p>Complete</p>
                    <?php endif; ?>

                    <?php if ($project['status'] <> 0) : ?>

                        <h3>Accepted price: </h3>
                        <p>CAD $<?php echo $project['price'] ?></p>

                    <?php endif; ?>

                    <?php if ($project['status'] == 0) : ?>
                        <h2>Project's Bids</h2>
                    <?php else : ?>
                        <h2>Project's Milestones</h2>
                    <?php endif; ?>

                </div>

                    <div class="data-table">

                        <?php if ($project['status'] == 0) : ?>

                            <table>
                                <tr>
                                    <th class="small">ID</th>
                                    <th>Value</th>
                                    <th>User</th>
                                    <th>Actions</th>
                                </tr>

                                <?php foreach ($bids AS $bid) : ?>

                                    <?php if ($bid['project'] == $id) : ?>

                                        <tr>
                                            <td><?php echo $bid['id'] ?></td>
                                            <td>CAD $<?php echo $bid['bid'] ?></td>
                                            <td><?php echo $bid['user_fname'] . ' ' . $bid['user_lname'] ?></td>
                                            <td><a href="users.php?id=<?php echo $project['id'] ?>"><i class="fas fa-external-link-square-alt"></i></a></td>
                                        </tr>

                                    <?php endif; ?>

                                <?php endforeach; ?>

                            </table>

                        <?php else : ?>

                            <table>
                                <tr>
                                    <th class="small">ID</th>
                                    <th>Value</th>
                                    <th>Status</th>
                                    <th>Release date</th>
                                </tr>

                                <?php foreach ($milestones AS $miles) : ?>

                                    <?php if ($miles['project'] == $id) : ?>

                                        <tr>
                                            <td><?php echo $miles['id'] ?></td>
                                            <td>CAD $<?php echo $miles['price'] ?></td>

                                            <?php if ($miles['status'] == 0) : ?>
                                                <td>Created</td>
                                                <td>N/A</td>
                                            <?php else : ?>
                                                <td>Released</td>
                                                <td><?php echo $miles['released_date'] ?></td>
                                            <?php endif; ?>

                                        </tr>

                                    <?php endif; ?>

                                <?php endforeach; ?>

                            </table>

                        <?php endif; ?>

                    </div>
    
                <?php endif; ?>

            <?php endforeach; ?>

        <button>DELETE</button>

    </div>

<?php endif; ?>

<?php

include('./includes/footer.php');

?>
