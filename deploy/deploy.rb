# This file is part of the Kreta package.
#
# (c) Beñat Espiña <benatespina@gmail.com>
# (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.

############################################
# Setup project
############################################

set :application, "kreta.io"
set :repo_url, "git@github.com:kreta/kreta.io.git"
set :scm, :git

############################################
# Setup Capistrano
############################################

set :log_level, :info
set :use_sudo, false

set :ssh_options, {
  forward_agent: true
}

set :keep_releases, 3

############################################
# Linked files and directories (symlinks)
############################################

set :linked_files, %w{web/robots.txt web/.htaccess config.yml}
set :linked_dirs, %w{cache}

set :theme_path, 'src'

set :composer_install_flags, '--no-dev --no-interaction --optimize-autoloader'

namespace :compile_and_upload do

  desc 'Compile and upload'

  task :bower do
    if fetch(:env) == "prod"
      run_locally do
        execute "cd #{fetch(:theme_path)}; bower install"
      end
    else
      on roles(:all) do |host|
        execute "cd #{release_path}/#{fetch(:theme_path)}; bower install"
      end
    end
  end

  task :gulp do
    if fetch(:env) == "prod"
      run_locally do
        execute "cd #{fetch(:theme_path)}; gulp prod"
      end
    else
      on roles(:all) do |host|
        execute "cd #{release_path}/#{fetch(:theme_path)}; npm install && gulp prod"
      end
    end
  end

  task :upload do
    if fetch(:env) == "prod"
      on roles(:all) do |host|
        upload! "web/css",      "#{release_path}/web/css", recursive: true
        upload! "web/images",   "#{release_path}/web/images", recursive: true
        upload! "web/js",       "#{release_path}/web/js", recursive: true
        upload! "web/svg",      "#{release_path}/web/svg", recursive: true
      end
    end
  end
end

namespace :deploy do
  after :updated, 'composer:install_executable'
  after :updated, 'compile_and_upload:bower'
  after :updated, 'compile_and_upload:gulp'
  after :updated, 'compile_and_upload:upload'
end
