let map;
function initMap() {
    // const jakarta = { lat: 0.5, lng: 110 };
    const jakarta = { lat: -7.352, lng: 111.499 };

    // Inisialisasi peta
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
        center: jakarta,
        gestureHandling: 'greedy', // Mengizinkan zoom menggunakan scroll
        mapTypeId: google.maps.MapTypeId.HYBRID,
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT // Pindahkan ke bawah kiri
        },
        styles: [
            {
                featureType: "administrative.locality", // Nama kota
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "administrative.neighborhood", // Nama kelurahan
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "poi", // Tempat umum
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "administrative.province", // Nama provinsi
                elementType: "labels",
                stylers: [{ visibility: "on" }]
            }
        ]
    });

    function loadDAS(url, color) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.features.forEach(f => {
                    if (!f.properties) f.properties = {};
                    f.properties.fillColor = color;
                });

                map.data.addGeoJson(data);
            });
    }

    loadDAS('/data/pembagian_subdas.json', 'red');
    loadDAS('/data/reach.json', 'blue');
    loadDAS('/data/subdas_bs_hulu_v2.json', 'yellow');

    map.data.setStyle(function(feature) {
        const fillColor = feature.getProperty('fillColor') || 'gray';
        return {
            fillColor: fillColor,
            fillOpacity: 0.3,
            strokeColor: 'white',
            strokeWeight: 0.7
        };
    });

    map.data.addListener('click', function(event) {
        const name = event.feature.getProperty('name');
        new google.maps.InfoWindow({
            content: `<strong>${name}</strong>`,
            position: event.latLng
        }).open(map);
    });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: jakarta }, (results, status) => {
        if (status === "OK" && results[0]) {
            let province = '';
            for (const component of results[0].address_components) {
                if (component.types.includes("administrative_area_level_1")) {
                    province = component.long_name;
                    break;
                }
            }

            const infowindow = new google.maps.InfoWindow({
                content: `<strong>${province}</strong>`,
            });
            infowindow.open(map);
        }
    });
}

$(document).ready(function() {
    $("#table-ews").DataTable({ 
        responsive: false,
        language: { 
            paginate: { 
                previous: "<i class='mdi mdi-chevron-left'>", 
                next: "<i class='mdi mdi-chevron-right'>" 
            } 
        }, 
        drawCallback: function () { 
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded") 
        }
    });

    $("#table-rainfall").DataTable({ 
        responsive: false,
        language: { 
            paginate: { 
                previous: "<i class='mdi mdi-chevron-left'>", 
                next: "<i class='mdi mdi-chevron-right'>" 
            } 
        }, 
        drawCallback: function () { 
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded") 
        }
    });

    $("#table-tma").DataTable({ 
        responsive: false,
        language: { 
            paginate: { 
                previous: "<i class='mdi mdi-chevron-left'>", 
                next: "<i class='mdi mdi-chevron-right'>" 
            } 
        }, 
        drawCallback: function () { 
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded") 
        }
    });
});