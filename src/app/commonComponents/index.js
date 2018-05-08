/**
 * Created by admin on 2017/4/20.
 */
import angular from 'angular';
import commonTable from './table';
import upload from './upload';
import backdrop from './backdrop';
import messagebarAlert from './messagebar-alert';
import dialog from './dialog';

export default angular.module('commonComponents', [commonTable, upload, backdrop, messagebarAlert, dialog]).name;