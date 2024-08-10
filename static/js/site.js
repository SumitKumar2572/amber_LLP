$(function() {
    var clipboard = new ClipboardJS('.copy_button');
    clipboard.on('success', function(e) {
        e.clearSelection();
        showCopied(e.trigger, 'copied!');
    });
    function showCopied(elem, msg) {
        var t = elem.textContent || elem.innerText;
        elem.disabled = true;
        elem.textContent = msg;
        setTimeout(function() {
            elem.textContent = t;
            elem.disabled = false;
        }, 3000);
    }

    $(".numerical").on("keypress keyup blur",function (event) {
        $(this).val($(this).val().replace(/[^0-9\.|\,]/g,''));
        if(event.which == 44) {
            return true;
        }
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57  )) {
            event.preventDefault();
        }
    });

    $('.nospaces').on("input", function () {
        $(this).val($(this).val().replace(/ /g, ""));
    });

    $('.calc_button').on('keypress click',function (event) {
        event.preventDefault();

        var cl = $(this).prop('classList').toString();
        var curr = cl.substring(cl.lastIndexOf('_')+1);

        var amount = parseFloat( $('.'+curr+'_input').val().replace(',', '.') );
        var hourly = amount * 2.5 / 100;
        var total = amount * 1.2;

        $('.calc_1_'+curr).html(parseFloat(hourly.toFixed(8)));
        $('.calc_2_'+curr).html(parseFloat(total.toFixed(8)));
    });

    $('.accmenulinks a[href="'+window.location.pathname.substr(1)+'"]').each(function(){
        $(this).addClass('active');
    });

    if ($("#serverTime").length > 0) {
        var expected = serverTime;
        var date;
        var hours;
        var minutes;
        var seconds;
        var day;
        var month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sep";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";
        var monthName;
        var year;
        var now = performance.now();
        var then = now;
        var dt = 0;
        var nextInterval = interval = 1000;

        setTimeout(step, interval);

        function step() {
            then = now;
            now = performance.now();
            dt = now - then - nextInterval;

            nextInterval = interval - dt;
            serverTime += interval;
            date     = new Date(serverTime);
            hours    = date.getUTCHours();
            minutes  = date.getUTCMinutes();
            seconds  = date.getUTCSeconds();
            day    = date.getUTCDate();
            monthName  = month[date.getUTCMonth()];
            year  = date.getUTCFullYear();

            document.getElementById('serverTime').innerHTML = '<b>' + leadZeroes(hours) + ':' + leadZeroes(minutes) + ':' + leadZeroes(seconds)
                                                            + '</b> ' + day + ' ' + monthName + ' ' + year;

            now = performance.now();

            setTimeout(step, Math.max(0, nextInterval));
        }

        function leadZeroes(n) {
            return (n < 10) ? '0' + n : n;
        }
    }


    if ($('#btc').length > 0) {
        $("#btc")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Bitcoin address!');
        }
        $("#btc")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#eth').length > 0) {
        $("#eth")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Ethereum address!');
        }
        $("#eth")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#ltc').length > 0) {
        $("#ltc")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Litecoin address!');
        }
        $("#ltc")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#doge').length > 0) {
        $("#doge")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Dogecoin address!');
        }
        $("#doge")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#xrp').length > 0) {
        $("#xrp")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Ripple address!');
        }
        $("#xrp")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#xrp2').length > 0) {
        $("#xrp2")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Ripple destination tag!');
        }
        $("#xrp2")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#pm').length > 0) {
        $("#pr")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Payeer wallet!');
        }
        $("#pr")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#pr').length > 0) {
        $("#pm")[0].oninvalid = function () {
            this.setCustomValidity('Please enter valid Perfect Money USD wallet!');
        }
        $("#pm")[0].oninput= function () {
            this.setCustomValidity("");
        };
    };

    if ($('#code').length > 0) {
        $('#code').focus();
    }

    if ($('#payments').length > 0) {
        $.fn.dataTableExt.pager.numbers_length = 10000;
        $('#payments').DataTable({
            "searching": false,
            "lengthChange": false,
            "ordering": false,
            "info": false,
            "processing": true,
            "serverSide": true,
            "pageLength": 15,
            "ajax": {
                "url": "ajax/payments",
                "type": "post",
            },
            "dom": '<"top"li>rt<"bottom"fp><"clear">',
            "language": {
                "loadingRecords": '&nbsp;',
                "processing": '<div class="spinner"></div>'
            }
        });
    }

    if ($('#operations').length > 0) {
        $('#operations').DataTable({
            "searching": false,
            "lengthChange": false,
            "ordering": false,
            "info": false,
            "processing": true,
            "serverSide": true,
            "pageLength": 30,
            "ajax": {
                "url": "ajax/operations",
                "type": "post",
            },
            "dom": '<"top"li>rt<"bottom"fp><"clear">',
            "language": {
                "loadingRecords": '&nbsp;',
                "processing": '<div class="spinner"></div>'
            }
        });
    }

    if ($('#partners').length > 0) {
        $('#partners').DataTable({
            "searching": false,
            "lengthChange": false,
            "ordering": false,
            "info": false,
            "processing": true,
            "serverSide": true,
            "pageLength": 15,
            "ajax": {
                "url": "ajax/partners",
                "type": "post",
            },
            "dom": '<"top"li>rt<"bottom"fp><"clear">',
            "language": {
                "loadingRecords": '&nbsp;',
                "processing": '<div class="spinner"></div>'
            }
        });
    }

    if ($('#earnings').length > 0) {
        $('#earnings').DataTable({
            "searching": false,
            "lengthChange": false,
            "ordering": false,
            "info": false,
            "processing": true,
            "serverSide": true,
            "pageLength": 15,
            "ajax": {
                "url": "ajax/earnings",
                "type": "post",
            },
            "dom": '<"top"li>rt<"bottom"fp><"clear">',
            "language": {
                "loadingRecords": '&nbsp;',
                "processing": '<div class="spinner"></div>'
            }
        });
    }
});