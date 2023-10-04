#!/bin/bash
# Copyright 2023 BlueCat Networks Inc.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# Check if jq is installed if not install it on the VM
if ! dpkg -s jq >/dev/null 2>&1;
  then
    sudo apt-get update -y
    sudo apt-get -y install jq
  fi


# Check if nginx is installed if not install it on the VM
if ! dpkg -s nginx >/dev/null 2>&1;
  then
    sudo apt-get -y install nginx
  fi

# Variables
nginx_config_file="/etc/nginx/sites-available/REPLACE_FILE_LOCATION_LATER"
deployment_config_file="$HOME/storybook_static_files/config.json"
endpoint_name=$(jq -r '.endpoint' "$deployment_config_file")
static_files_path="$HOME/storybook_static_files/$(jq -r '.staticFilesPath' "$deployment_config_file")"

# Create initial nginx configuration file for the site if it doesn't exist
if [ ! -e "$nginx_config_file" ];
  then
    sudo touch "$nginx_config_file"
    echo "
    server {

      listen 80;
      server_name REPLACE_SERVER_NAME_LATER;

      location / { rewrite ^ /latest permanent; }

    }

    types {
	    application/javascript mjs;
    }
    " | sudo tee "$nginx_config_file" >/dev/null
    sudo ln -s -f $nginx_config_file /etc/nginx/sites-enabled/
  else
    echo "Nginx configuration file already exist at this path $nginx_config_file"
fi


# Check if the endpoint exists in the nginx configuration file
endpoint_exists() {
  local endpoint_name="$1"
  grep -q "location $endpoint_name" "$nginx_config_file"
}

# Check endpoint exist or add them to the configuration
# Validate nginx configuration file syntax
# Restart nginx services
if ! endpoint_exists "$endpoint_name";
  then
    location="location $endpoint_name { alias $static_files_path; index index.html; }"
    # Get the line number of the closing curly brace of the server block
    closing_brace_line=$(grep -n '^\s*}' "$nginx_config_file" | cut -d':' -f1 | head -n1)

    # Insert the new content above the closing curly brace
    sudo sed -i "${closing_brace_line}i ${location}" "$nginx_config_file"

    # Check Nginx syntax
    sudo nginx -t

    if [ $? -eq 0 ]; then
      sudo service nginx restart
    else
        echo "Nginx configuration file syntax is invalid."
        exit 1
    fi
  else
    echo "Endpoints already exist in the Nginx configuration file."
  fi