async function initMap() {
    await ymaps3.ready;
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
        '@yandex/ymaps3-default-ui-theme@0.0.23'
    ]);

    const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [37.588144, 55.733842],
                zoom: 11
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    fetch('data/apartments.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(a => {
                const marker = new YMapDefaultMarker(
                    {
                        title: a["name"],
                        subtitle: a["desc"],
                        coordinates: a["coordinates"],
                        staticHint: true
                    }
                );
                map.addChild(marker);
            })
        });
}

initMap();