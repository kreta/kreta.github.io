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

server "dev.company.com", user: "sshuser", roles: %w{web}
set :deploy_to, "/path/to/your/deployment/directory"
set :env,  "dev"

############################################
# Setup Git
############################################

set :branch, "master"
