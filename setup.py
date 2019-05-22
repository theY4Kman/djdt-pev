from setuptools import setup

setup(
    name='djdt-pev',
    version='0.0.1',
    packages=['djdt_pev', 'djdt_pev.panels'],
    url='https://github.com/theY4Kman/djdt-pev',
    license='MIT',
    author='Zach "theY4Kman" Kanzler',
    author_email='they4kman@gmail.com',
    description='Django Debug Toolbar SQL Panel, with PEV interface for inspecting query plans',
    install_requires=[
      'django-debug-toolbar'
    ],
    include_package_data=True,
)
