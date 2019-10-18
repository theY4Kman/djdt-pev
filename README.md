# Django Debug Toolbar Postgres Explain Visualizer (djdt-pev)

Written by [Alexander Tatiyant](https://github.com/AlexTatiyants), [Postgres Explain Visualizer (pev)](https://github.com/AlexTatiyants/pev) is designed to make [EXPLAIN](http://www.postgresql.org/docs/current/static/sql-explain.html) output easier to grok. It creates a graphical representation of the plan. You can see it in action at [tatiyants.com/pev](http://tatiyants.com/pev/), or read about it [on Alexander's' blog](http://tatiyants.com/postgres-query-plan-visualization/).

djdt-pev bundles up PEV and exposes it in the SQL panel of [django-debug-toolbar](https://github.com/jazzband/django-debug-toolbar).


## Installation

djdt-pev may be installed from PyPI with
```bash
pip install djdt-pev
```

Then, add `djdt_pev` to `INSTALLED_APPS`, so its static assets can be served
```python
INSTALLED_APPS = [
    # ...
    'debug_toolbar',
    'djdt_pev',
    # ...
]
```

Finally, replace django-debug-toolbar's default `SQLPanel` with djdt-pev's enhanced version
```python
DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.timer.TimerPanel',
    # 'debug_toolbar.panels.sql.SQLPanel',
    'djdt_pev.PevSQLPanel',
    'debug_toolbar.panels.profiling.ProfilingPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
    'debug_toolbar.panels.versions.VersionsPanel',
]
```


## Build
To build the PEV app, run
```bash
npm start build.prod
```

To create a djdt-pev package distribution, run
```bash
python setup.py sdist
```
