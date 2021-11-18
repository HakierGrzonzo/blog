# How to use SmartCards on Linux

Smartcard are great for use with GnuPG keys and for two factor authentication.

## What smartcard should I buy?

If you intend to use your smartcard to store your private GNU PG keys, you need
to get a card compatible with *OpenPGP-Standard*. Normal ones do not come with 
circuitry required for encryption and signing.

It is harder to find them then 
normal smartcards (and more expensive!), but I bought mine from 
[FLOSS Shop](https://www.floss-shop.de/en/security-privacy/smartcards/13/openpgp-smart-card-v3.4).
They do not accept credit cards, so you will have to pay by bank transfer.

## Which reader should I get?

If your reader is supported by Linux, it should just work. As far as I know there
are no special requirements for OpenPGP cards.

### Installing for Arch Linux

Follow the instructions in [Arch Wiki](https://wiki.archlinux.org/title/Smartcards).

If you are unsure that a reader that you own (e.g. One in your laptop) works
properly under Linux, you can test it by installing `pcsc-tools` package in Arch
Linux. Then run the following command:

    $ pcsc_scan
    Using reader plug'n play mechanism
    Scanning present readers...
    0: Alcor Micro AU9540 00 00

    Thu Nov 18 22:32:40 2021
     Reader 0: Alcor Micro AU9540 00 00
      Event number: 0
      Card state: Card removed,

Then, you can test your reader with a smartcard you already own. A credit card will
work, but you can try whatever card you have access to.

    Thu Nov 18 22:35:27 2021
     Reader 0: Alcor Micro AU9540 00 00
      Event number: 1
      Card state: Card inserted,
      ATR: 3B DA 18 FF 81 B1 FE 75 1F 03 00 31 F5 73 C0 01 60 00 90 00 1C
    [...] // lots of info
    Possibly identified card (using /usr/share/pcsc/smartcard_list.txt):
    3B DA 18 FF 81 B1 FE 75 1F 03 00 31 F5 73 C0 01 60 00 90 00 1C
        OpenPGP Card V3

## Setting up gpg

[Here is a great write up on how to do it](https://gist.github.com/btcdrak/73f7b54eafbed2a3f10f41375a04cb6d)

## Setting up PAM

Install [poldi](https://aur.archlinux.org/packages/poldi/).

We will be using the `localdb` mode of authentication. Open up `/etc/poldi/poldi.conf`
your favorite text editor and ensure it is configured like this:

    # This is the main configuration file of Poldi.

    # Specify authentication method:
    # (supported methods: localdb, x509)
    auth-method localdb

    # Specify the log file:
    log-file /var/log/poldi.log

    # Enable debugging messages
    debug

    # Specify SCDaemon executable
    scdaemon-program /usr/lib/gnupg/scdaemon

Then create directory to store the keys:

    # mkdir -p /etc/poldi/localdb/keys

Then obtain the serial number of your card:

    $ poldi-ctrl --dump | grep "Serial number"

Finally store your public key in local database:

    # poldi-ctrl --print-key > /etc/poldi/localdb/keys/$YOUR_CARD_SERIAL_NUM

### PAM config files:

Create file `/etc/pam.d/poldi` with the following content:

    auth    sufficient    pam_poldi.so

Then, wherever you wish to use your card to authenticate, simply insert:

    auth    include    pam_poldi.so

At the top of the corresponding file in `/etc/pam.d/`. Some programs (like `sddm`)
do not provide any way to insert a PIN number in order to unlock the card, but
stuff like `sudo` will prompt you correctly.

