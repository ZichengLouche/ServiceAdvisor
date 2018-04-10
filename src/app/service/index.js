
import http from './http';
import httpClient from './httpClient.service';
import fileService from './file.service';

export default angular.module('services', [http, httpClient, fileService]).name;