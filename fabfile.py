# -*- coding:utf-8 -*-
import os
import psutil
from fabric.api import local, settings, abort, run, env
from fabric.contrib.console import confirm
from fabric.context_managers import cd, settings, hide

USER = 'categulario'
HOST = 'categulario.tk'
APP_NAME = 'checkpoint.categulario.tk'

# Host and login username:
env.hosts = ['%s@%s' % (USER, HOST)]

APP_ROOT = "/home/{}/webapps/{}".format(USER, APP_NAME)

def pull():
    with cd(APP_ROOT):
        run("git pull")

def install_dependencies():
    """Instala las nuevas dependencias del paquete en el servidor remoto"""
    with cd(APP_ROOT):
        run("npm install")

def build_webapp():
    with cd(APP_ROOT):
        run("npm run build")

def deploy():
    """Actualiza el servidor de producción"""
    pull()
    install_dependencies()
    build_webapp()
