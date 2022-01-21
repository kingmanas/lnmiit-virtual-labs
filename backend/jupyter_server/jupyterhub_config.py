import os
import sys


c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.DockerSpawner.image = os.environ['DOCKER_JUPYTER_IMAGE']
c.DockerSpawner.network_name = os.environ['DOCKER_NETWORK_NAME']
c.JupyterHub.hub_connect_ip = os.environ['HUB_IP']
c.JupyterHub.hub_ip = "0.0.0.0"
c.JupyterHub.admin_access = True
c.JupyterHub.autoreload = True
c.JupyterHub.tornado_settings = {
    "headers": {
        "Content-Security-Policy": "frame-ancestors 'self' http://localhost:*; report-uri /hub/security/csp-report" 
        }
    }
}

c.JupyterHub.services = [
    {
        'name': 'cull_idle',
        'admin': True,
        'command': [sys.executable, 'cull_idle_servers.py', '--timeout=42000']
    },
]

c.Spawner.default_url = '/lab'
notebook_dir = os.environ.get('DOCKER_NOTEBOOK_DIR') or '/home/jovyan/work'
c.DockerSpawner.notebook_dir = notebook_dir

c.JupyterHub.authenticator_class = 'jwtauthenticator.jwtauthenticator.JSONWebTokenLocalAuthenticator'
c.JSONWebTokenAuthenticator.secret = 'R4nd0m_S3cr3t_K3y'
c.JSONWebTokenAuthenticator.username_claim_field = 'username'
c.JSONWebTokenAuthenticator.expected_audience = ''
c.JSONWebLocalTokenAuthenticator.create_system_users = True
c.JSONWebTokenAuthenticator.cookie_name = 'token'
