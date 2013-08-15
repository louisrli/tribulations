#!/bin/bash -ex
# Releases tribulations.min.js to the Github page
# Compiles, minifies, runs tests, then commits it to the gh-page

RELEASE="tribulations.min.js"
grunt
git checkout gh-pages
cp "dist/$RELEASE" .

# Don't commit if no diff
if [[ ! -z $(git diff "$RELEASE") ]]; then
    git reset  # Make sure no extraneous files are staged
    git add "$RELEASE"
    git ci -m "[RELEASE] Updated tribulations.min.js"
fi

git checkout -
