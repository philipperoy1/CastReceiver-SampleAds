const context = cast.framework.CastReceiverContext.getInstance();

const playerManager = context.getPlayerManager();

const mediaData = {
  contentType: "application/dash+xml",
  streamType: "BUFFERED",
  contentUrl:
    "https://storage.googleapis.com/cpe-sample-media/content/big_buck_bunny/big_buck_bunny_m4s_master.mpd",
  adTagUrl:
    "https://pubads.g.doubleclick.net/gampad/ads?description_url=https%3a%2f%2fgem.cbc.ca%2fharlots%2fs02e08&url=https%3a%2f%2fgem.cbc.ca%2fharlots%2fs02e08&vid=963927&ppid=03b0f79f99eabd88acc4924895602441d47186e9e6baf71e3f3645dc7509dc3c&env=vp&gdfp_req=1&unviewed_position_start=1&cmsid=2556398&ad_rule=1&hl=en&iu=5876%2fentertainment%2fshows%2fharlots&sz=320x240&output=xml_vmap&vpi=1&pp=chromecast-app&scp=bu%3dgem&nofb=2&ciu_szs=300x250%7c300x600&label=viewable_impression&lmt=1&cust_params=plat%3dott%26ut%3dmem%26device%3dchromecast-app%26site%3dgem%26channel%3dGem%26player%3dxlarge%26avdur%3d051%26language%3den%26rating%3d18%2b%26genres%3ddrama%26subject%3d%26rcTelco%3daucun%26season%3d002%26episode%3d008%26series%3dHarlots%26title%3dEpisode+8&correlator=" +
    Math.floor(Math.random() * 10000),
};

playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  (request) => {
    return new Promise((resolve, reject) => {
      // Stream
      request.media.contentUrl = mediaData.contentUrl;
      request.media.contentType = mediaData.contentType;
      request.media.streamType = mediaData.streamType;

      // ADS
      let vastTemplate = new cast.framework.messages.VastAdsRequest();
      vastTemplate.adTagUrl = mediaData.adTagUrl;
      request.media.vmapAdsRequest = vastTemplate;

      // METADATA
      let metadata = new cast.framework.messages.GenericMediaMetadata();
      metadata.title = "Title";
      metadata.subtitle = "Author";
      request.media.metadata = metadata;

      console.log("request = ", request);
      resolve(request);
    });
  }
);

context.start();
