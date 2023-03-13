"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUtils = void 0;
const psl = require('psl');
class MyUtils {
    static removeWhiteSpace(input) {
        return input.replace(/\s+/g, '');
    }
    static emailValidator(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(String(value).toLowerCase());
        });
    }
    static numberValidator(value) {
        let numberRegex = /^[0-9]+$/;
        return numberRegex.test(String(value).toLowerCase());
    }
    static removeSpace(value) {
        return value.replace(/\s+/g, '');
    }
    static startOfDate(date) {
        date.setHours(0, 0, 0, 0);
        return date;
    }
    static endOfDate(date) {
        date.setHours(23, 59, 59, 999);
        return date;
    }
    static stringDateConversion(dateString) {
        const date = new Date(dateString);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return [day, month, date.getFullYear()].join("/");
    }
    static stringToDate(date, format, delimiter) {
        try {
            let formatLowerCase = format.toLowerCase();
            let formatItems = formatLowerCase.split(delimiter);
            let dateItems = date.split(delimiter);
            let monthIndex = formatItems.indexOf("mm");
            let dayIndex = formatItems.indexOf("dd");
            let yearIndex = formatItems.indexOf("yyyy");
            let month = parseInt(dateItems[monthIndex]);
            let year = parseInt(dateItems[yearIndex]);
            let day = parseInt(dateItems[dayIndex]);
            month -= 1;
            let formattedDate = new Date(year, month, day);
            return formattedDate;
        }
        catch (e) {
            throw e;
        }
    }
    static indexOfArray(array, origin) {
        const exactHostname = MyUtils.extractHostname(origin);
        return array.indexOf(exactHostname);
    }
    static toTimeStamp(date) {
        const datum = new Date(date);
        return datum.getTime();
    }
    static dateToTimeStamp(date) {
        return date.getTime();
    }
    static pageNumber(pageNumber, pageSize, index) {
        if (pageNumber == 0) {
            return (index + 1);
        }
        else {
            return (index + pageSize + pageNumber);
        }
    }
    static extractHostname(url) {
        let hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname
        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
        //find & remove port number
        const hostNameOrIpOnlyNoPort = hostname.split(':')[0];
        console.log(hostname);
        if (hostname.includes('localhost')) {
            return hostname;
        }
        const isIp = MyUtils.validateIPaddress(hostNameOrIpOnlyNoPort);
        // console.log(isIp);
        if (isIp) {
            console.log(' hostname : ' + hostname);
            return hostname;
        }
        else {
            //find & remove "?"
            hostname = hostname.split('?')[0];
            return psl.get(hostname);
        }
    }
    static validateIPaddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return true;
        }
        // alert("You have entered an invalid IP address!");
        return false;
    }
    static addMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    static addHoursToDate(date, hours) {
        return new Date(date.getTime() + (hours * 60 * 60 * 1000));
    }
    static removeHoursToDate(date, hours) {
        return new Date(date.getTime() - (hours * 60 * 60 * 1000));
    }
    static checkIfObjectIsEmpty(obj) {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }
    static addDaysToDate(days) {
        const date = new Date();
        return date.setDate(date.getDate() + days);
    }
    static randomString(length) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    static randomStringOfNumbers(length) {
        const chars = '0123456789';
        let result = '';
        for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    static pageOffsetCalculator(pageNumber, pageSize, index) {
        try {
            let result = pageNumber * pageSize + index + 1;
            return result;
        }
        catch (e) {
            return 0;
        }
    }
    static stringToNumber(input) {
        try {
            return parseInt(input);
        }
        catch (e) {
            return null;
        }
    }
}
exports.MyUtils = MyUtils;
