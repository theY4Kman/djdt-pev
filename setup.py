from setuptools import setup

setup(
    name='djdt-pev',
    version='0.0.1',
    packages=['djdt_pev', 'djdt_pev.panels'],
    url='https://github.com/theY4Kman/djdt-pev',
    license='',
    author='they4kman',
    author_email='',
    description='Django Debug Toolbar SQL Panel, with PEV interface for inspecting query plans',
    install_requires=[
      'django-debug-toolbar'
    ]
)
