# This file is part of the Kreta package.
#
# (c) Beñat Espiña <benatespina@gmail.com>
# (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.

############################################
# Setup Server
############################################

server "kreta.io", user: "kreta", roles: %w{web}
set :deploy_to, "/var/www/kreta-io"
set :env,  "prod"

############################################
# Setup Git
############################################

set :branch, "master"
