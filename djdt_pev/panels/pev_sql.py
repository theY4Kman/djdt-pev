import json

from debug_toolbar.decorators import require_show_toolbar
from debug_toolbar.panels.sql import SQLPanel
from debug_toolbar.panels.sql.forms import SQLSelectForm
from django.conf.urls import url
from django.http import HttpResponseBadRequest
from django.template.response import SimpleTemplateResponse
from django.views.decorators.csrf import csrf_exempt


class PevSQLPanel(SQLPanel):
    template = 'pev_sql/sql_panel.html'

    @classmethod
    def get_urls(cls):
        return super().get_urls() + [
            url(r'^sql_pev/$', sql_pev, name='sql_pev'),
        ]


@csrf_exempt
@require_show_toolbar
def sql_pev(request):
    """Returns the output of the SQL EXPLAIN on the given query"""
    form = SQLSelectForm(request.POST or None)
    if not form.is_valid():
        return HttpResponseBadRequest('Form errors')

    sql = form.cleaned_data['raw_sql']
    params = form.cleaned_data['params']
    cursor = form.cursor
    cursor.execute("EXPLAIN (ANALYZE, VERBOSE, BUFFERS, FORMAT JSON) %s" % (sql,), params)
    plan, = cursor.fetchone()

    context = {
        'plan_content': json.dumps(plan),
        'plan_name': 'Test', #XXX######################################################################################
        'plan_query': sql,
        'base': request.path,
    }

    # Using SimpleTemplateResponse avoids running global context processors.
    return SimpleTemplateResponse('pev_sql/pev.html', context)
