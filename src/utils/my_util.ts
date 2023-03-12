const psl = require('psl');

export class MyUtils {

    static removeWhiteSpace(input: string) {
        return input.replace(/\s+/g, '');
    }

    static async emailValidator(value: string) {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(value).toLowerCase());
    }

    static numberValidator(value: string) {
        let numberRegex = /^[0-9]+$/;
        return numberRegex.test(String(value).toLowerCase());
    }

    static removeSpace(value: string) {
        return value.replace(/\s+/g, '');
    }

    static startOfDate (date: Date) {
        date.setHours(0,0,0,0);
        return date;
    }

    static endOfDate(date: Date) {
        date.setHours(23,59,59,999);
        return date;
    }

    static stringDateConversion(dateString: string) {
        const date = new Date(dateString);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return [day, month, date.getFullYear()].join("/");

    }

    static stringToDate(date: string, format: string, delimiter: string) {

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
        } catch (e) {
            throw e;
        }
    }

    static indexOfArray(array: string[], origin: any) {
        // console.log('origin were searching for: ' + origin);
        const exactHostname = MyUtils.extractHostname(origin);
        // console.log('exactHostname: ' + exactHostname);
        const foundIndex = array.indexOf(exactHostname);
        return foundIndex;
    }


    static toTimeStamp(date: string) {
        const datum: Date = new Date(date);
        return datum.getTime();
    }


    static dateToTimeStamp(date: Date): number {
        return date.getTime();
    }

    static pageNumber(pageNumber: number, pageSize: number, index: number) {
        if (pageNumber == 0) {
           return  (index + 1);
        } else {
            return (index + pageSize + pageNumber);
        }
    }

    static extractHostname(url: string) {
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

        if(hostname.includes('localhost')){
            return hostname;
        }

        const isIp = MyUtils.validateIPaddress(hostNameOrIpOnlyNoPort);

        // console.log(isIp);

        if(isIp) {
            console.log(' hostname : ' + hostname);
            return hostname;

        } else {
            //find & remove "?"
            hostname = hostname.split('?')[0];
            return psl.get(hostname);
        }
    }


    static validateIPaddress(ipaddress: string) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return true;
        }
        // alert("You have entered an invalid IP address!");
        return false;
    }


    static addMinutesToDate(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes*60000);
    }


    static addHoursToDate(date: Date, hours: number) {
        return new Date(date.getTime() + (hours*60*60*1000));
    }

    static removeHoursToDate(date: Date, hours: number) {
        return new Date(date.getTime() - (hours*60*60*1000));
    }


    static checkIfObjectIsEmpty(obj) {

        for(let prop in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    static addDaysToDate(days: number) {
        const date = new Date();
        return date.setDate(date.getDate() + days);

    }


    static randomString(length: number) {
        const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


    static randomStringOfNumbers(length: number) {
        const chars: string = '0123456789';
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    static pageOffsetCalculator(pageNumber: number, pageSize: number, index: number) {
        try {
            let result = pageNumber * pageSize + index + 1;
            return result;
        } catch (e) {
            return  0;
        }
    }


    static stringToNumber(input: string): number | null {
        try {
           return  parseInt(input);
        } catch (e) {
           return  null;
        }
    }
}
