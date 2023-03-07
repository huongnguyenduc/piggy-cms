# Prompt for app name
appname=$(sed "s/ /-/g" <<< $1)

appname_underscore=$(sed "s/-/_/g" <<< $1)

# Heredoc wrapper for tidyness (starting now, because we can't seem to prompt for input within heredoc)
bash << EOF
# Inspect script first if you are leery of pipe-to-bash
if ( command -v flyctl )
then
  echo "You have installed flyctl"
else
  curl -L https://fly.io/install.sh | sh
fi

# This will open a browser, where you can enter a username and password, and your credit card (which is required even for free tier, for fraud prevention).

if ( flyctl auth whoami )
then
  echo "You are logged in"
else
  flyctl auth signup
fi

# Create a directory for the project and enter it, since the next command will output a file
mkdir ghost-$appname && cd ghost-$appname

# Create an app -- using Ghost Dockerfile, Seattle region, and app name prompted for earlier -- but don't deploy it
echo | flyctl launch --name $appname --image=ghost:latest --region sea --no-deploy

# Provision a volume for Ghost's content and SQLite Database.
# Size can be up to 3GB and still fit in the free plan, but 1GB will be enough for starters.
flyctl volumes create data_$appname_underscore --region sea --size 1

# Install sed (stream editor), if it isn't already installed
# TODO
# sudo apt install sed

# Update the port to Ghost's default (2368)
sed -i '' -e 's/internal_port = 8080/internal_port = 2368/g' fly.toml

# Append info about where to find the persistent storage to fly.toml
cat >> fly.toml << BLOCK
[mounts]
  source="data_$appname_underscore"
  destination="/var/lib/ghost/content"
BLOCK

# Remove [env]
sed -i '' -e 's/\[env\]//g' fly.toml

# Add
cat >> fly.toml << BLOCK
[env]
  url = "https://$appname.fly.dev"
  database__client = "sqlite3"
  database__connection__filename = "content/data/ghost.db"
  database__useNullAsDefault = "true"
  database__debug = "false"
BLOCK

# Boom! We're airborne.
flyctl launch

# Delete the directory we created earlier
cd .. && rm -rf ghost-$appname

# End our bash Heredoc
EOF
