# Whatsappgram server


## Installation for Ubuntu

You need to install node and git
and clone this repo

	sudo apt update && sudo apt upgrade -y
  sudo reboot
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
  sudo apt-get install -y nodejs

  sudo npm install -g typescript
  sudo npm install -g ts-node
  sudo apt install lightdm
  sudo apt install ubuntu-desktop
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  sudo dpkg -i google-chrome-stable_current_amd64.deb
  sudo apt install ubuntu-desktop
  
  git clone https://github.com/dfstio/whatsappgram-server
	cd whatsappgram-server
  npm install
  touch env.json
  nano env.json

  // Looks like 
{
    "TELEGRAMURL": "https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/dev/YYYYYYY"
}


Make sure that minanft command is executable by running from whatsappgram-server folder

	chmod +x ./src/whatsapp.ts
	sudo npm link


  ## Usage
ssh into the remote machine
cd whatsappgram-server
Clear whatsapp tokens:
rm -r tokens
start tmux by typing tmux into the shell:
tmux
start the process you want inside the started tmux session:
whatsappgram
Then scan QR code with your WhatsApp
leave/detach the tmux session by typing Ctrl+b and then d
Close terminal window:
exit


