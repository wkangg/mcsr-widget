# MCSR Ranked widget for OBS

Minimalistic MCSR Ranked widget for OBS that displays your live stats. It tracks all your matches in today’s session, including ELO, rank, ELO change, winrate, average completion time, and more.

![Examples](/examples/examples.png)

## Usage

I’ve deployed the widget on my server — just open [ranked.noobweer.ru](ranked.noobweer.ru) and customize your own. Configurator will generate a URL for you to add into OBS.

![Examples](/examples/configurator.png)

Or, if you prefer, you can self-host it locally or on your own server.

## Installation

```bash
cd mcsr-widget
npm install
```

Create .env file with:
VITE_HOST='yourdomain.com' for production or VITE_HOST='http://localhost:5173' for local usage
