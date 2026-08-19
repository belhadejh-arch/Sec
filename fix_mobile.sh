#!/bin/bash
sed -i 's/\.app-container > \.content { padding: 0 8px 30px !important; margin-top: -5px; }/\.app-container > \.content { padding: 0 4px 20px !important; margin-top: 0 !important; }/g' attached_assets/index.html
