/**
 * Created by admin on 2017/4/20.
 */
import angular from 'angular';
import commonTable from './table';
import upload from './upload';
import backdrop from './backdrop';

export default angular.module('commonComponents', [commonTable, upload, backdrop]).name;