import docker
import unittest

class TestContainerStatus(unittest.TestCase):

    def setUp(self):
        self.client = docker.from_env()

    def test_containers_up(self):
        containers = self.client.containers.list()
        container_names = [container.name for container in containers]
        expected_containers = {'globo_backend_1', 'globo_db_1', 'globo_frontend_1'}

        for expected in expected_containers:
            with self.subTest(container=expected):
                self.assertIn(expected, container_names, f'Contêiner {expected} não está em execução.')

if __name__ == '__main__':
    unittest.main()
