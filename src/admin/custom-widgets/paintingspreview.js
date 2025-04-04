var ArtCollectionsPreview = createClass({
  getInitialState: function() {
    return {};
  },

  handleEdit: function(collectionIndex, paintingIndex, paintingTitle, e) {
    e.preventDefault();
    window.parent.postMessage({
      action: "focusPaintingByTitle",
      collectionIndex: collectionIndex,
      paintingIndex: paintingIndex,
      title: paintingTitle
    }, "*");
  },

  render: function() {
    // Get the collections array from the entry data.
    var collectionsData = this.props.entry.getIn(['data', 'collections']);
    var collections = collectionsData ? collectionsData.toJS() : [];

    // Shared text style.
    var textStyle = { 
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    };

    return h("div", { style: Object.assign({ padding: "10px", marginTop: "2rem" }, textStyle) },
      collections.length > 0 ?
        collections.map(function(collection, cIndex) {
          return h("div", { key: cIndex, style: { border: "1px solid #ccc", padding: "10px", marginBottom: "20px" } },
            // Collection header: title and optional URL.
            h("h2", { style: textStyle }, collection.title || "Untitled Collection"),
            collection.url && h("a", {
              href: collection.url,
              target: "_blank",
              style: Object.assign({ color: "blue", textDecoration: "underline" }, textStyle)
            }, "Collection URL"),
            // Paintings list.
            h("div", { style: { marginTop: "10px" } },
              collection.paintings && collection.paintings.length > 0 ?
                collection.paintings.map(function(painting, pIndex) {
                  return h("div", { 
                    key: pIndex, 
                    style: { 
                      border: "1px solid #ddd", 
                      padding: "5px", 
                      marginBottom: "10px", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center" 
                    }
                  },
                    // Left: image and painting details.
                    h("div", { style: { display: "flex", alignItems: "center" } },
                      painting.feature_image && h("img", { 
                        src: painting.feature_image, 
                        style: { width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" } 
                      }),
                      h("div", null,
                        h("div", { style: textStyle }, painting.title || "No Title"),
                        h("div", { style: textStyle }, painting.price ? "$" + painting.price : "No Price")
                      )
                    ),
                    // Right: "View Painting" and "Edit" actions.
                    h("div", { style: { display: "flex", alignItems: "center" } },
                      painting.url && h("a", {
                        href: painting.url,
                        target: "_blank",
                        style: Object.assign({ color: "blue", textDecoration: "underline", marginLeft: "10px" }, textStyle)
                      }, "View Painting"),
                      // h("a", {
                      //   href: "#",
                      //   onClick: this.handleEdit.bind(this, cIndex, pIndex, painting.title),
                      //   style: Object.assign({ color: "blue", textDecoration: "underline", cursor: "pointer", marginLeft: "10px" }, textStyle)
                      // }, "Edit")
                    )
                  );
                }, this)
              :
              h("div", { style: textStyle }, "No paintings in this collection.")
            )
          );
        }, this)
      :
      h("div", { style: textStyle }, "No art collections found.")
    );
  }
});

CMS.registerPreviewTemplate("artCollections", ArtCollectionsPreview);
