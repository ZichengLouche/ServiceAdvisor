
import http from './http';
import httpClient from './httpClient.service';
import fileService from './file.service';
import userService from './user.service';

export default angular.module('services', [http, httpClient, fileService, userService]).name;